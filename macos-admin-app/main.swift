import Cocoa
import WebKit

class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate, WKUIDelegate, NSToolbarDelegate {
    var window: NSWindow!
    var webView: WKWebView!
    var statusField: NSTextField!
    var envControl: NSSegmentedControl!
    var viewModeControl: NSSegmentedControl!
    
    let localBase = "http://127.0.0.1:3000"
    let cloudBase = "https://auraint0ext-source.github.io/learning-journey"
    
    var isUsingLocal = true
    var isAdminMode = true
    var hasFallenBackToCloud = false

    func applicationDidFinishLaunching(_ notification: Notification) {
        buildMenu()
        createWindow()
        loadTargetURL()
        NSApp.activate(ignoringOtherApps: true)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    // MARK: - Window Creation
    func createWindow() {
        let windowRect = NSRect(x: 100, y: 100, width: 1440, height: 920)
        window = NSWindow(
            contentRect: windowRect,
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered,
            defer: false
        )
        window.center()
        window.minSize = NSSize(width: 1024, height: 680)
        window.title = "PrintFlow Admin Studio • Executive Operations"
        window.titlebarAppearsTransparent = false
        window.toolbarStyle = .unified

        // Setup Toolbar
        let toolbar = NSToolbar(identifier: "PrintFlowAdminToolbar")
        toolbar.delegate = self
        toolbar.allowsUserCustomization = false
        toolbar.displayMode = .iconAndLabel
        window.toolbar = toolbar

        // WebKit Configuration
        let config = WKWebViewConfiguration()
        config.preferences.setValue(true, forKey: "developerExtrasEnabled")
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        webView = WKWebView(frame: window.contentView!.bounds, configuration: config)
        webView.autoresizingMask = [.width, .height]
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.customUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) PrintFlowAdminStudio/2.0 Chrome/120.0.0.0 Safari/537.36"

        window.contentView?.addSubview(webView)
        window.makeKeyAndOrderFront(nil)
    }

    // MARK: - URL Construction & Loading
    func currentTargetURL() -> URL {
        let base = isUsingLocal ? localBase : cloudBase
        let query = isAdminMode ? "?admin=1" : ""
        let fullString = "\(base)/\(query)"
        return URL(string: fullString)!
    }

    func loadTargetURL() {
        let url = currentTargetURL()
        updateStatus("Connecting to \(isUsingLocal ? "Local Server (3000)" : "Cloud Live (GitHub Pages)")...", isConnected: false)
        let request = URLRequest(url: url, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 4.0)
        webView.load(request)
    }

    func updateStatus(_ text: String, isConnected: Bool) {
        DispatchQueue.main.async {
            if let sf = self.statusField {
                let dot = isConnected ? "🟢 " : "🟡 "
                sf.stringValue = "\(dot)\(text)"
                sf.textColor = isConnected ? NSColor.systemGreen : NSColor.systemOrange
            }
        }
    }

    // MARK: - WKNavigationDelegate
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        updateStatus("Loading \(isUsingLocal ? "Local Dev Server" : "Cloud Live")...", isConnected: false)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let envText = isUsingLocal ? "Local Server (127.0.0.1:3000)" : "Cloud Live Production"
        let modeText = isAdminMode ? "Admin Studio" : "Storefront"
        updateStatus("Connected • \(envText) • \(modeText)", isConnected: true)
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        let nsError = error as NSError
        if isUsingLocal && !hasFallenBackToCloud {
            hasFallenBackToCloud = true
            isUsingLocal = false
            if let ec = envControl {
                ec.selectedSegment = 1
            }
            updateStatus("Local server offline. Auto-switched to Cloud Live...", isConnected: false)
            let fallbackURL = currentTargetURL()
            webView.load(URLRequest(url: fallbackURL, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 10.0))
        } else {
            updateStatus("Status: \(nsError.localizedDescription)", isConnected: false)
        }
    }

    // MARK: - Toolbar Delegate
    func toolbarAllowedItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier] {
        return [
            .init("BackNav"),
            .init("ForwardNav"),
            .init("RefreshNav"),
            .init("SyncDeployNav"),
            .flexibleSpace,
            .init("ModeControl"),
            .init("EnvControl"),
            .init("StatusItem")
        ]
    }

    func toolbarDefaultItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier] {
        return [
            .init("BackNav"),
            .init("ForwardNav"),
            .init("RefreshNav"),
            .init("SyncDeployNav"),
            .flexibleSpace,
            .init("ModeControl"),
            .init("EnvControl"),
            .init("StatusItem")
        ]
    }

    func toolbar(_ toolbar: NSToolbar, itemForItemIdentifier itemIdentifier: NSToolbarItem.Identifier, willBeInsertedIntoToolbar flag: Bool) -> NSToolbarItem? {
        let item = NSToolbarItem(itemIdentifier: itemIdentifier)

        switch itemIdentifier.rawValue {
        case "BackNav":
            item.label = "Back"
            item.toolTip = "Go back"
            item.image = NSImage(systemSymbolName: "chevron.left", accessibilityDescription: "Back")
            item.target = self
            item.action = #selector(goBackAction)
            return item

        case "ForwardNav":
            item.label = "Forward"
            item.toolTip = "Go forward"
            item.image = NSImage(systemSymbolName: "chevron.right", accessibilityDescription: "Forward")
            item.target = self
            item.action = #selector(goForwardAction)
            return item

        case "RefreshNav":
            item.label = "Reload"
            item.toolTip = "Reload view (Cmd+R)"
            item.image = NSImage(systemSymbolName: "arrow.clockwise", accessibilityDescription: "Reload")
            item.target = self
            item.action = #selector(reloadAction)
            return item

        case "SyncDeployNav":
            item.label = "Deploy Live"
            item.toolTip = "Builds & pushes latest edits directly to GitHub Pages and Vercel"
            item.image = NSImage(systemSymbolName: "arrow.up.circle.fill", accessibilityDescription: "Deploy")
            item.target = self
            item.action = #selector(syncDeployAction)
            return item

        case "ModeControl":
            item.label = "View Mode"
            let seg = NSSegmentedControl(labels: ["👑 Admin Studio", "🛍️ Storefront"], trackingMode: .selectOne, target: self, action: #selector(viewModeChanged(_:)))
            seg.selectedSegment = isAdminMode ? 0 : 1
            self.viewModeControl = seg
            item.view = seg
            return item

        case "EnvControl":
            item.label = "Environment"
            let seg = NSSegmentedControl(labels: ["💻 Local", "🌐 Cloud Live"], trackingMode: .selectOne, target: self, action: #selector(envChanged(_:)))
            seg.selectedSegment = isUsingLocal ? 0 : 1
            self.envControl = seg
            item.view = seg
            return item

        case "StatusItem":
            item.label = "System Health"
            let label = NSTextField(labelWithString: "🟢 Connecting...")
            label.font = NSFont.monospacedSystemFont(ofSize: 11, weight: .semibold)
            label.isBezeled = false
            label.drawsBackground = false
            label.isEditable = false
            label.isSelectable = false
            self.statusField = label
            item.view = label
            return item

        default:
            return nil
        }
    }

    // MARK: - Actions
    @objc func goBackAction() {
        if webView.canGoBack { webView.goBack() }
    }

    @objc func goForwardAction() {
        if webView.canGoForward { webView.goForward() }
    }

    @objc func reloadAction() {
        webView.reload()
    }

    @objc func syncDeployAction() {
        updateStatus("Building & Deploying to Cloud Live (GitHub & Vercel)...", isConnected: false)
        DispatchQueue.global(qos: .userInitiated).async {
            let task = Process()
            task.launchPath = "/bin/bash"
            task.arguments = ["/Users/mdarif/.gemini/antigravity/scratch/pod-ecommerce-platform/sync-to-cloud.sh"]
            task.launch()
            task.waitUntilExit()

            DispatchQueue.main.async {
                if task.terminationStatus == 0 {
                    self.updateStatus("✓ Cloud Live Deployed & Live!", isConnected: true)
                    let alert = NSAlert()
                    alert.messageText = "Deployment Successful!"
                    alert.informativeText = "Your changes have been pushed to GitHub and deployed live to GitHub Pages & Vercel."
                    alert.alertStyle = .informational
                    alert.addButton(withTitle: "OK")
                    alert.runModal()
                    if !self.isUsingLocal {
                        self.webView.reload()
                    }
                } else {
                    self.updateStatus("Deployment encountered an error.", isConnected: false)
                }
            }
        }
    }

    @objc func viewModeChanged(_ sender: NSSegmentedControl) {
        isAdminMode = (sender.selectedSegment == 0)
        loadTargetURL()
    }

    @objc func envChanged(_ sender: NSSegmentedControl) {
        isUsingLocal = (sender.selectedSegment == 0)
        hasFallenBackToCloud = !isUsingLocal
        loadTargetURL()
    }

    // MARK: - Main Menu
    func buildMenu() {
        let mainMenu = NSMenu()

        // 1. App Submenu
        let appMenuItem = NSMenuItem()
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "About PrintFlow Admin Studio", action: #selector(aboutApp), keyEquivalent: "")
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(withTitle: "Hide PrintFlow Admin Studio", action: #selector(NSApplication.hide(_:)), keyEquivalent: "h")
        let hideOthers = NSMenuItem(title: "Hide Others", action: #selector(NSApplication.hideOtherApplications(_:)), keyEquivalent: "h")
        hideOthers.keyEquivalentModifierMask = [.command, .option]
        appMenu.addItem(hideOthers)
        appMenu.addItem(withTitle: "Show All", action: #selector(NSApplication.unhideAllApplications(_:)), keyEquivalent: "")
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(withTitle: "Quit PrintFlow Admin Studio", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appMenuItem.submenu = appMenu
        mainMenu.addItem(appMenuItem)

        // 2. Edit Menu (Standard text shortcuts)
        let editMenuItem = NSMenuItem()
        let editMenu = NSMenu(title: "Edit")
        editMenu.addItem(withTitle: "Undo", action: #selector(UndoManager.undo), keyEquivalent: "z")
        editMenu.addItem(withTitle: "Redo", action: #selector(UndoManager.redo), keyEquivalent: "Z")
        editMenu.addItem(NSMenuItem.separator())
        editMenu.addItem(withTitle: "Cut", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        editMenu.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        editMenu.addItem(withTitle: "Paste", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        editMenu.addItem(withTitle: "Select All", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        editMenuItem.submenu = editMenu
        mainMenu.addItem(editMenuItem)

        // 3. View Menu
        let viewMenuItem = NSMenuItem()
        let viewMenu = NSMenu(title: "View")
        viewMenu.addItem(withTitle: "Reload Page", action: #selector(reloadAction), keyEquivalent: "r")
        let forceReload = NSMenuItem(title: "Force Reload", action: #selector(forceReloadAction), keyEquivalent: "r")
        forceReload.keyEquivalentModifierMask = [.command, .shift]
        viewMenu.addItem(forceReload)
        viewMenu.addItem(NSMenuItem.separator())
        let deployItem = NSMenuItem(title: "Deploy & Push to Cloud Live", action: #selector(syncDeployAction), keyEquivalent: "S")
        deployItem.keyEquivalentModifierMask = [.command, .shift]
        viewMenu.addItem(deployItem)
        viewMenu.addItem(NSMenuItem.separator())
        viewMenu.addItem(withTitle: "Switch to Admin Studio", action: #selector(switchToAdminAction), keyEquivalent: "1")
        viewMenu.addItem(withTitle: "Switch to Storefront View", action: #selector(switchToStoreAction), keyEquivalent: "2")
        viewMenu.addItem(NSMenuItem.separator())
        viewMenu.addItem(withTitle: "Toggle Full Screen", action: #selector(toggleFullScreenAction), keyEquivalent: "f")
        viewMenuItem.submenu = viewMenu
        mainMenu.addItem(viewMenuItem)

        // 4. Window Menu
        let windowMenuItem = NSMenuItem()
        let windowMenu = NSMenu(title: "Window")
        windowMenu.addItem(withTitle: "Minimize", action: #selector(NSWindow.miniaturize(_:)), keyEquivalent: "m")
        windowMenu.addItem(withTitle: "Zoom", action: #selector(NSWindow.zoom(_:)), keyEquivalent: "")
        windowMenu.addItem(NSMenuItem.separator())
        windowMenu.addItem(withTitle: "Bring All to Front", action: #selector(NSApplication.arrangeInFront(_:)), keyEquivalent: "")
        windowMenuItem.submenu = windowMenu
        mainMenu.addItem(windowMenuItem)

        NSApp.mainMenu = mainMenu
    }

    @objc func aboutApp() {
        let alert = NSAlert()
        alert.messageText = "PrintFlow Admin Studio"
        alert.informativeText = "Version 2.0 (macOS Native Edition)\nExecutive Enterprise Management Console for Print-on-Demand E-Commerce.\n\nCrafted for macOS Apple Silicon."
        alert.alertStyle = .informational
        alert.addButton(withTitle: "OK")
        alert.runModal()
    }

    @objc func forceReloadAction() {
        webView.reloadFromOrigin()
    }

    @objc func switchToAdminAction() {
        isAdminMode = true
        if let vmc = viewModeControl { vmc.selectedSegment = 0 }
        loadTargetURL()
    }

    @objc func switchToStoreAction() {
        isAdminMode = false
        if let vmc = viewModeControl { vmc.selectedSegment = 1 }
        loadTargetURL()
    }

    @objc func toggleFullScreenAction() {
        window.toggleFullScreen(nil)
    }
}

// Top-Level Execution
let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.regular)
app.run()

import UIKit
import RNNotifeeCore

typealias ContentHandler = (UNNotificationContent) -> Void

// This extension allows us to do some processing of the received notification
// data before displaying the notification to the user. In our use case, there
// are a few particular things that we want to do:
//
// - Determine whether we should play a sound for the notification
// - Download and display any images for the notification
// - Update the badge count accordingly

class NotifeeNotificationService: UNNotificationServiceExtension {
  private var contentHandler: ContentHandler?
  private var bestAttempt: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest,
                             withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        self.bestAttempt = (request.content.mutableCopy() as? UNMutableNotificationContent)


        NotifeeExtensionHelper.populateNotificationContent(request,
                                with: self.bestAttempt!,
                                withContentHandler: contentHandler)
    }

}

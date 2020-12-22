/**
 *
 * @interface {message} The message from the message event.
 */
interface Message {
    channel: any, // The message channel
    author: any, // The message author
    member: any, // The message author
    guild: any, // The message guild
    content: String, // The message content
    reply: Function // A method to reply to the message
};

//Exports
export default Message;
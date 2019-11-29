class AppStrings {
    static ERROR_JSON_PARSE = 'Failed to parse message';
    static SOCKET_CONNECTION_SUCCESS = 'Connected to socket';
    static SOCKET_CONNECTION_CLOSED = 'Socket connection closed';
    static SOCKET_CONNECTION_ERROR = 'Socket connection error';

    static CLIENT_ADDED = 'Client successfully added!';
    static CLIENT_ADDING_ERROR = "Client wasn't added!";
    static CLIENT_REMOVED = 'Client successfully removed!';
    static CLIENT_REMOVED_ERROR = 'Failed to remove client!';

    static TOPIC_ADDED = 'Topic successfully added!';
    static TOPIC_REMOVED = 'Topic successfully removed!'
    static TOPIC_REMOVED_ERROR = 'Failed to remove topic!';
    static TOPIC_ADDED_ERROR = "Failed to add topic!";

    static TOPICS_ASSOCIATION_SUCCESS = "Topics successfully set on client!";
    static TOPICS_ASSOCIATION_ERROR = "Failed to set topics on client!";

    static CLIENT_ASSOCIATION_SUCCESS = "Clients successfully set on topic!";
    static CLIENT_ASSOCIATION_ERROR = "Failed to set clients on topic!";

    static RULE_ADDED = 'Rule successfully added!';
    static RULE_ERROR = "Failed to add rule!";

    static RULE_UPDATED = 'Rule successfully updated!';
}

export default AppStrings

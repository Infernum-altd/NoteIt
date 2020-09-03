package com.altynnikov.NoteIt.mail;

public interface FeedbackSender {
    void sendFeedback(String from, String name, String feedback);
}

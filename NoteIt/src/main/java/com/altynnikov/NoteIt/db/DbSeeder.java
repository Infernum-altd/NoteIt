package com.altynnikov.NoteIt.db;

import com.altynnikov.NoteIt.model.Note;
import com.altynnikov.NoteIt.model.Notebook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * This component will only execute (and get instantiated) if the
 * property noteit.db.recreate is set to true in the
 * application.properties file
 */

@Component
@ConditionalOnProperty(name = "noteid.db.recreate", havingValue = "true")
public class DbSeeder implements CommandLineRunner {
    @Autowired
    private NotebookRepository notebookRepository;
    @Autowired
    private NoteRepository noteRepository;

    @Override
    public void run(String... args) throws Exception {
        //Remove all existing entities
        this.notebookRepository.deleteAll();
        this.noteRepository.deleteAll();

        //Save a default notebook

        Notebook defaultNotebook = new Notebook("default");
        this.notebookRepository.save(defaultNotebook);

        Notebook quotesNotebook = new Notebook("quotes");
        this.notebookRepository.save(quotesNotebook);

        //Save the welcome note

        Note note = new Note("Hello", "Welcome to Note It", defaultNotebook);
        this.noteRepository.save(note);

        //Save a quote note
        Note quoteNote = new Note("Latin Quote", "Carpe Diem", quotesNotebook);
        this.noteRepository.save(quoteNote);

        System.out.println("Initialized database");
    }
}

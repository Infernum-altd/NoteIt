package com.altynnikov.NoteIt.api;

import com.altynnikov.NoteIt.Mapper;
import com.altynnikov.NoteIt.api.viewmodel.NotebookViewModel;
import com.altynnikov.NoteIt.db.NotebookRepository;
import com.altynnikov.NoteIt.model.Notebook;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notebooks")
@CrossOrigin
public class NotebookController {
    private NotebookRepository notebookRepository;
    private Mapper mapper;

    public NotebookController(NotebookRepository notebookRepository, Mapper mapper) {
        this.notebookRepository = notebookRepository;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public List<Notebook> all(){
        List<Notebook> allCategories = this.notebookRepository.findAll();
        return allCategories;
    }

    @PostMapping
    public Notebook save(@RequestBody NotebookViewModel notebookViewModel,
                         BindingResult bindingResult) throws ValidationException {
        if (bindingResult.hasErrors()) {
            throw new ValidationException("err");
        }

        Notebook notebookEntity = this.mapper.convertToNotebookEntity(notebookViewModel);

        this.notebookRepository.save(notebookEntity);

        return notebookEntity;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        this.notebookRepository.deleteById(UUID.fromString(id));
    }
}

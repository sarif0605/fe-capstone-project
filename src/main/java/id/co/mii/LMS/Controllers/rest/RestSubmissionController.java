package id.co.mii.LMS.Controllers.rest;

import id.co.mii.LMS.Models.Submission;
import id.co.mii.LMS.Service.SubmissionService;

import java.util.List;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/submission")
public class RestSubmissionController {

    private SubmissionService submissionService;

    @GetMapping
    public List<Submission> getAll() {
        return submissionService.getAll();
    }

    @GetMapping("/{id}")
    public Submission getById(@PathVariable Integer id) {
        return submissionService.getById(id);
    }

    @PostMapping
    public Submission create(@RequestBody Submission submission) {
        return submissionService.create(submission);
    }

    @DeleteMapping("/{id}")
    public Submission delete(@PathVariable Integer id) {
        return submissionService.delete(id);
    }

    @PutMapping("/{id}")
    public Submission update(@PathVariable Integer id, @RequestBody Submission submission) {
        return submissionService.update(id, submission);
    }
}
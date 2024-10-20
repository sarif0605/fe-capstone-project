package id.co.mii.LMS.Controllers.rest;

import id.co.mii.LMS.Models.Assignment;
import id.co.mii.LMS.Service.AssignmentService;

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
@RequestMapping("/api/assignment")
public class RestAssignmentController {
    private AssignmentService assignmentService;

    @GetMapping
    public List<Assignment> getAll() {
        return assignmentService.getAll();
    }

    @GetMapping("/{id}")
    public Assignment getById(@PathVariable Integer id) {
        return assignmentService.getById(id);
    }

    @PostMapping
    public Assignment create(@RequestBody Assignment assignment) {
        return assignmentService.create(assignment);
    }

    @DeleteMapping("/{id}")
    public Assignment delete(@PathVariable Integer id) {
        return assignmentService.delete(id);
    }

    @PutMapping("/{id}")
    public Assignment update(@PathVariable Integer id, @RequestBody Assignment assignment) {
        return assignmentService.update(id, assignment);
    }
}

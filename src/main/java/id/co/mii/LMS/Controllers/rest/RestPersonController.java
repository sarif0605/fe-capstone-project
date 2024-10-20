package id.co.mii.LMS.Controllers.rest;

import id.co.mii.LMS.Models.Person;
import id.co.mii.LMS.Service.PersonService;

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
@RequestMapping("/api/person")
public class RestPersonController {

    private PersonService personService;

    @GetMapping
    public List<Person> getAll() {
        return personService.getAll();
    }

    @GetMapping("/{id}")
    public Person getById(@PathVariable Integer id) {
        return personService.getById(id);
    }

    @PostMapping
    public Person create(@RequestBody Person person) {
        return personService.create(person);
    }

    @DeleteMapping("/{id}")
    public Person delete(@PathVariable Integer id) {
        return personService.delete(id);
    }

    @PutMapping("/{id}")
    public Person update(@PathVariable Integer id, @RequestBody Person person) {
        return personService.update(id, person);
    }
}
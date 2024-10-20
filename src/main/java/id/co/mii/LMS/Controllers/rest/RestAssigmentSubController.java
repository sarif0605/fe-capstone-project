package id.co.mii.LMS.Controllers.rest;

import id.co.mii.LMS.Models.AssigmentSub;
import id.co.mii.LMS.Service.AssigmentSubService;

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
@RequestMapping("/api/sub")
public class RestAssigmentSubController {
    private AssigmentSubService assigmentSubService;

    @GetMapping
    public List<AssigmentSub> getAll() {
        return assigmentSubService.getAll();
    }

    @GetMapping("/{id}")
    public AssigmentSub getById(@PathVariable Integer id) {
        return assigmentSubService.getById(id);
    }

    @PostMapping
    public AssigmentSub create(@RequestBody AssigmentSub assigmentSub) {
        return assigmentSubService.create(assigmentSub);
    }

    @DeleteMapping("/{id}")
    public AssigmentSub delete(@PathVariable Integer id) {
        return assigmentSubService.delete(id);
    }

    @PutMapping("/{id}")
    public AssigmentSub update(@PathVariable Integer id, @RequestBody AssigmentSub assigmentSub) {
        return assigmentSubService.update(id, assigmentSub);
    }
}

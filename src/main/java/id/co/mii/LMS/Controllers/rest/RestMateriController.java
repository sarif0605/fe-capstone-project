package id.co.mii.LMS.Controllers.rest;

import id.co.mii.LMS.Models.Materi;
import id.co.mii.LMS.Service.MateriService;

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
@RequestMapping("/api/materi")
public class RestMateriController {
    private MateriService materiService;

@GetMapping
public List<Materi> getAll() {
    return materiService.getAll();
}

@GetMapping("/{id}")
public Materi getById(@PathVariable Integer id) {
    return materiService.getById(id);
}

@PostMapping
public Materi create(@RequestBody Materi materi) {
    return materiService.create(materi);
}

@DeleteMapping("/{id}")
public Materi delete(@PathVariable Integer id) {
    return materiService.delete(id);
}

@PutMapping("/{id}")
public Materi update(@PathVariable Integer id, @RequestBody Materi materi) {
    return materiService.update(id, materi);
}

}
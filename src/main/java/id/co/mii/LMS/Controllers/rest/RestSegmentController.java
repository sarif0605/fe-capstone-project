package id.co.mii.LMS.Controllers.rest;

import id.co.mii.LMS.Models.Segment;
import id.co.mii.LMS.Service.SegmentService;

import java.util.List;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/api/segment")
public class RestSegmentController {

    private SegmentService segmentService;

    @GetMapping
    public List<Segment> getAll() {
        return segmentService.getAll();
    }

    @GetMapping("/{id}")
    public Segment getById(@PathVariable Integer id) {
        return segmentService.getById(id);
    }

    @PostMapping
    public Segment create(@RequestBody Segment segment) {
        return segmentService.create(segment);
    }

    @DeleteMapping("/{id}")
    public Segment delete(@PathVariable Integer id) {
        return segmentService.delete(id);
    }

    @PutMapping("/{id}")
    public Segment update(@PathVariable Integer id, @RequestBody Segment segment) {
        return segmentService.updatete(id, segment);
    }
}
package id.co.mii.LMS.Controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.LMS.Service.SegmentService;
import lombok.AllArgsConstructor;

@CrossOrigin
@Controller
@AllArgsConstructor
@RequestMapping("/segment")
@PreAuthorize("hasAnyRole('Lecturer', 'Student')")
public class SegmentController {

    private SegmentService segmentService;

    @GetMapping
    public String getAll(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("segments", segmentService.getAll());
        model.addAttribute("isActive", "segment");
        return "segment/index";
    }

}
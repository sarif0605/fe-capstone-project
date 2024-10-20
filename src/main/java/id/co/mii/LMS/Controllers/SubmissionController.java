package id.co.mii.LMS.Controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.LMS.Service.SubmissionService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/submission")
@PreAuthorize("hasAnyRole('Lecturer', 'Student')")
public class SubmissionController {

    private SubmissionService submissionService;

    @GetMapping
    public String getAll(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("submissions", submissionService.getAll());
        model.addAttribute("isActive", "submission");
        return "submission/index";
    }

}
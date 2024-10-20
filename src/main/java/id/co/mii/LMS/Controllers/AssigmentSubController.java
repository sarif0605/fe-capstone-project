package id.co.mii.LMS.Controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.LMS.Service.AssigmentSubService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/sub")
@PreAuthorize("hasAnyRole('Student', 'Lecturer')")
public class AssigmentSubController {

    private AssigmentSubService assigmentSubService;

    @GetMapping
    public String getAll(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("AssignmentSubs", assigmentSubService.getAll());
        model.addAttribute("isActive", "assignmentsub");
        return "sub/index";
    }

}
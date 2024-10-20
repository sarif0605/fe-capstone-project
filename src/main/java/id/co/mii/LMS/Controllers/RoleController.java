package id.co.mii.LMS.Controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.LMS.Service.RoleService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/role")
@PreAuthorize("hasRole('ADMIN')")
public class RoleController {
    private RoleService roleService;

    @GetMapping
    public String getAll(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("roles", roleService.getAll());
        model.addAttribute("isActive", "role");
        return "role/index";
    }
}
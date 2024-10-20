package id.co.mii.LMS.Controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.LMS.Service.PersonService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
@RequestMapping("/person")
public class PersonController {
  
    private PersonService personService;

    @GetMapping
    public String getAll(Model model, Authentication authentication) {
        String username = authentication.getName();
        model.addAttribute("username", username);
        model.addAttribute("persons", personService.getAll());
        model.addAttribute("isActive", "person");
        return "person/index";
    }

}
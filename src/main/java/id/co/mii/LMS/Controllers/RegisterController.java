package id.co.mii.LMS.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import id.co.mii.LMS.Models.dto.request.UserRequest;

@Controller
public class RegisterController {
    @GetMapping("/register")
	public String index() {
		
		return "register/index";
	}

@PostMapping("/register")
public String userRequest(UserRequest userRequest){
   return "register/index";
}
}
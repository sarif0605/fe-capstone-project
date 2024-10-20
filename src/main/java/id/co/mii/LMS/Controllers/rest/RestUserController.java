package id.co.mii.LMS.Controllers.rest;

 import id.co.mii.LMS.Models.User;
 import id.co.mii.LMS.Service.UserService;
 import org.springframework.web.bind.annotation.*;

 import java.util.List;

 @RestController
 @RequestMapping("/api/user")
 public class RestUserController {

     private final UserService userService;

     public RestUserController(UserService userService) {
         this.userService = userService;
     }

     @GetMapping
     public List<User> getAllUsers() {
         return userService.getAll();
     }

     @GetMapping("/{id}")
     public User getUserById(@PathVariable Integer id) {
         return userService.getById(id);
     }

     @PostMapping
     public User createUser(@RequestBody User user) {
         return userService.create(user);
     }

     @PutMapping("/{id}")
     public User updateUser(@PathVariable Integer id, @RequestBody User user) {
         return userService.update(id, user);
     }

     @DeleteMapping("/{id}")
     public User deleteUser(@PathVariable Integer id) {
         return userService.delete(id);
     }
 }
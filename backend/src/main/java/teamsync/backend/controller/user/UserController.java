//package teamsync.backend.controller.user;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import teamsync.backend.entity.User;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")
//@RequiredArgsConstructor
//public class UserController {
//    private final UserService userService;
//
//    //dto
//    /*
//    @Getter
//    @Setter
//    public class LoginRequest() {
//        private String email;
//        private String password;
//    }
//     */
//
//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody LoginRequest req) {
//        User user = userService.login(req);
//
//        return ResponseEntity.ok(user);
//    }
//
//    @GetMapping("/search")
//    // localhost:8080/api/users/search?keyword="김성준"
//    // res: {"name":"김성준", "email":"test@gmail.com"}
//    public ResponseEntity<User> search(@RequestParam String keyword) {
//        User user = userService.getUsers(keyword);
//
//        return ResponseEntity.ok(user);
//    }
//}

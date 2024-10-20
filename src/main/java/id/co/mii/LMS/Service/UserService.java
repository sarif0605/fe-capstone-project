package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class UserService {

    @Value("${server.base.url}/user")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<User> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<User>>() {}
        ).getBody();
    }

    public User getById(Integer id) {
        return restTemplate.exchange(
                url.concat("/" + id),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<User>() {}
        ).getBody();
    }

    public User create(User user) {
        HttpEntity<User> httpEntity = new HttpEntity<>(user);
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                User.class
        ).getBody();
    }

    public User update(Integer id, User user) {
        HttpEntity<User> httpEntity = new HttpEntity<>(user);
        return restTemplate.exchange(
                url.concat("/" + id),
                HttpMethod.PUT,
                httpEntity,
                User.class
        ).getBody();
    }

    public User delete(Integer id) {
        return restTemplate.exchange(
                url.concat("/" + id),
                HttpMethod.DELETE,
                null,
                User.class
        ).getBody();
    }
}
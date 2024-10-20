package id.co.mii.LMS.Service;
import id.co.mii.LMS.Models.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PersonService {

    @Value("${server.base.url}/person")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Person> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Person>>() {}
        ).getBody();
    }

    public Person getById(Integer id) {
        return restTemplate.exchange(
                url.concat("/" + id),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Person>() {}
        ).getBody();
    }

    public Person create(Person person) {
        HttpEntity<Person> httpEntity = new HttpEntity<>(person);
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                httpEntity,
                Person.class
        ).getBody();
    }

    public Person update(Integer id, Person person) {
        HttpEntity<Person> httpEntity = new HttpEntity<>(person);
        return restTemplate.exchange(
                url.concat("/" + id),
                HttpMethod.PUT,
                httpEntity,
                Person.class
        ).getBody();
    }

    public Person delete(Integer id) {
        return restTemplate.exchange(
                url.concat("/" + id),
                HttpMethod.DELETE,
                null,
                Person.class
        ).getBody();
    }
}
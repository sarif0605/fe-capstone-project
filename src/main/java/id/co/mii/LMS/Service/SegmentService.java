package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.Segment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class SegmentService {

    @Value("${server.base.url}/segment")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Segment> getAll() {
        return restTemplate
                .exchange(
                        url,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<Segment>>() {
                        }
                )
                .getBody();
    }

    public Segment getById(Integer id) {
        return restTemplate
                .exchange(
                        url.concat("/" + id),
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<Segment>() {
                        }
                )
                .getBody();
    }

    public Segment create(Segment segment) {
        HttpEntity<Segment> httpEntity = new HttpEntity<Segment>(segment);
        return restTemplate
                .exchange(
                        url,
                        HttpMethod.POST,
                        httpEntity,
                        Segment.class
                )
                .getBody();
    }

    public Segment updatete(Integer id, Segment segment) {
        HttpEntity<Segment> httpEntity = new HttpEntity<>(segment);
        return restTemplate
                .exchange(
                        url.concat("/" + id),
                        HttpMethod.PUT,
                        httpEntity,
                        new ParameterizedTypeReference<Segment>() {
                        }
                )
                .getBody();
    }

    public Segment delete(Integer id) {
        return restTemplate
                .exchange(
                        url.concat("/" + id),
                        HttpMethod.DELETE,
                        null,
                        Segment.class
                )
                .getBody();
    }
}
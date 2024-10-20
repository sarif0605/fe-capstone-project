package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.Materi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MateriService {

    @Value("${server.base.url}/materi")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    public List<Materi> getAll() {
        return restTemplate
                .exchange(
                        url,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<Materi>>() {
                        }
                )
                .getBody();
    }

    public Materi getById(Integer id) {
        return restTemplate
                .exchange(
                        url.concat("/" + id),
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<Materi>() {
                        }
                )
                .getBody();
    }

    public Materi create(Materi materi) {
        HttpEntity<Materi> httpEntity = new HttpEntity<Materi>(materi);
        return restTemplate
                .exchange(
                        url,
                        HttpMethod.POST,
                        httpEntity,
                        Materi.class
                )
                .getBody();
    }

    public Materi update(Integer id, Materi materi) {
        HttpEntity<Materi> httpEntity = new HttpEntity<Materi>(materi);
        return restTemplate
                .exchange(
                        url.concat("/" + id),
                        HttpMethod.PUT,
                        httpEntity,
                        Materi.class
                )
                .getBody();
    }

    public Materi delete(Integer id) {
        return restTemplate
                .exchange(
                        url.concat("/" + id),
                        HttpMethod.DELETE,
                        null,
                        Materi.class
                )
                .getBody();
    }
}
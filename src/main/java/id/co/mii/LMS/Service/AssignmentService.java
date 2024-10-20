package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.Assignment;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AssignmentService {

  @Value("${server.base.url}/assignment")
  private String url;

  @Autowired
  private RestTemplate restTemplate;

  public List<Assignment> getAll() {
    return restTemplate
      .exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Assignment>>() {}
      )
      .getBody();
  }

  public Assignment getById(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Assignment>() {}
      )
      .getBody();
  }

  public Assignment create(Assignment assignment) {
    HttpEntity<Assignment> httpEntity = new HttpEntity<Assignment>(assignment);
    return restTemplate
    .exchange(
      url,
      HttpMethod.POST,
      httpEntity,
      Assignment.class
      )
      .getBody();
    }
    
    public Assignment update(Integer id, Assignment assignment) {
      HttpEntity<Assignment> httpEntity = new HttpEntity<Assignment>(assignment);
      return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.PUT,
        httpEntity,
        Assignment.class
      )
      .getBody();
  }

  public Assignment delete(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.DELETE,
        null,
        Assignment.class
      )
      .getBody();
  }
}
package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.Submission;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SubmissionService {

  @Value("${server.base.url}/submission")
  private String url;

  @Autowired
  private RestTemplate restTemplate;

  public List<Submission> getAll() {
    return restTemplate
      .exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Submission>>() {}
      )
      .getBody();
  }

  public Submission getById(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Submission>() {}
      )
      .getBody();
  }

  public Submission create(Submission submission) {
    HttpEntity<Submission> httpEntity = new HttpEntity<Submission>(submission);
    return restTemplate
    .exchange(
      url,
      HttpMethod.POST,
      httpEntity,
      Submission.class
      )
      .getBody();
    }
    
    public Submission update(Integer id, Submission submission) {
      HttpEntity<Submission> httpEntity = new HttpEntity<Submission>(submission);
      return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.PUT,
        httpEntity,
        Submission.class
      )
      .getBody();
  }

  public Submission delete(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.DELETE,
        null,
        Submission.class
      )
      .getBody();
  }
}
package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.AssigmentSub;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AssigmentSubService {

  @Value("${server.base.url}/sub")
  private String url;

  @Autowired
  private RestTemplate restTemplate;

  public List<AssigmentSub> getAll() {
    return restTemplate
      .exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<AssigmentSub>>() {}
      )
      .getBody();
  }

  public AssigmentSub getById(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<AssigmentSub>() {}
      )
      .getBody();
  }

  public AssigmentSub create(AssigmentSub assigmentSub) {
    HttpEntity<AssigmentSub> httpEntity = new HttpEntity<AssigmentSub>(assigmentSub);
    return restTemplate
    .exchange(
      url,
      HttpMethod.POST,
      httpEntity,
      AssigmentSub.class
      )
      .getBody();
    }
    
    public AssigmentSub update(Integer id, AssigmentSub assigmentSub) {
      HttpEntity<AssigmentSub> httpEntity = new HttpEntity<AssigmentSub>(assigmentSub);
      return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.PUT,
        httpEntity,
        AssigmentSub.class
      )
      .getBody();
  }

  public AssigmentSub delete(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.DELETE,
        null,
        AssigmentSub.class
      )
      .getBody();
  }
}
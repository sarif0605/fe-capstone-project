package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.Role;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RoleService {

  @Value("${server.base.url}/role")
  private String url;

  @Autowired
  private RestTemplate restTemplate;

  public List<Role> getAll() {
    return restTemplate
      .exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Role>>() {}
      )
      .getBody();
  }

  public Role getById(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Role>() {}
      )
      .getBody();
  }

  public Role create(Role role) {
    HttpEntity<Role> httpEntity = new HttpEntity<Role>(role);
    return restTemplate
    .exchange(
      url,
      HttpMethod.POST,
      httpEntity,
      Role.class
      )
      .getBody();
    }
    
    public Role update(Integer id, Role role) {
      HttpEntity<Role> httpEntity = new HttpEntity<Role>(role);
      return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.PUT,
        httpEntity,
        Role.class
      )
      .getBody();
  }

  public Role delete(Integer id) {
    return restTemplate
      .exchange(
        url.concat("/" + id),
        HttpMethod.DELETE,
        null,
        Role.class
      )
      .getBody();
  }
}
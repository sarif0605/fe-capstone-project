package id.co.mii.LMS.Service;

import id.co.mii.LMS.Models.dto.request.LoginRequest;
import id.co.mii.LMS.Models.dto.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class LoginService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.base.url}/login")
    public String url;
    
    public boolean login(LoginRequest loginRequest){
        try {
            ResponseEntity<LoginResponse> respon = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    new HttpEntity(loginRequest),
                    new ParameterizedTypeReference<LoginResponse>() {
                    }
            );
            if (respon.getStatusCode() == HttpStatus.OK){
                setAuthentication(respon.getBody(), loginRequest.getPassword());
                return true;
            }
        }catch (Exception e) {

        }
        return false;
    }

    public void setAuthentication(LoginResponse res, String pass){
        Collection<GrantedAuthority> authorities = res.getAuthorities()
                .stream().map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());

        UsernamePasswordAuthenticationToken userToken =
                new UsernamePasswordAuthenticationToken(
                        res.getUsername(),
                        pass,
                        authorities
                );
        SecurityContextHolder.getContext().setAuthentication(userToken);
    }


}
package id.co.mii.LMS.Utils;

import java.nio.charset.Charset;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;

public class BasicHeader {

    public static String createBasicToken(String username, String password) {
        String auth = username + ":" + password;
        byte[] encodedAuth = Base64.encodeBase64(
                auth.getBytes(Charset.forName("US-ASCII")));
        return new String(encodedAuth);
    }

    public static HttpHeaders getHeaders() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ;
        return new HttpHeaders() {
            {
                set("Authorization", "Basic " + createBasicToken(auth.getName(), auth.getCredentials().toString()));
            }
        };
    }

}
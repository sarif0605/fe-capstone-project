package id.co.mii.LMS.Models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Submission {
     private Integer id;
     private String title;
     private String file_submission;
     private List<AssigmentSub> assigmentSubs;
}

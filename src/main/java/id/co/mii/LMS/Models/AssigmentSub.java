package id.co.mii.LMS.Models;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssigmentSub {
     private Integer id;
    
    private Date start_date;
    private Date end_date;
    private Assignment assignment;
    private Submission submission;
    private Segment segment;
}   

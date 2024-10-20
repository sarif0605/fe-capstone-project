package id.co.mii.LMS.Models;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Segment {
    private Integer id;
    private String title;
    private String description;
    private Date start_date;
    private Date end_date;
    private Person lecture;
    private List<AssigmentSub> assigmentSubs;
}

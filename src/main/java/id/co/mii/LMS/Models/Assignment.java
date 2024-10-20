package id.co.mii.LMS.Models;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    private Integer id;
    private Integer lectureId;
    private String title;
    private String file_tugas;
    private Date deadline;
    private Person lecture;
    private List<AssigmentSub> assigmentSubs;
}

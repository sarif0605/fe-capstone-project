package id.co.mii.LMS.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Materi {
    private Integer id;
    private String title;
    private String file_materi;
    private String fileMateri;
    private Person lecture;
    private Segment student;

    private Integer lectureId;
    private Integer studentId;
    private byte[] file;
}

import java.time.LocalDate;
import java.util.*;

class Assessment {
    String name;
    LocalDate date;

    public Assessment(String name, LocalDate date) {
        this.name = name;
        this.date = date;
    }
}

public class assessmentClashChecker {

    static void checkForClashes(List<Assessment> assessments) {
        assessments.sort(Comparator.comparing(a -> a.date));

        for (int i = 1; i < assessments.size(); i++) {
            if (assessments.get(i).date.equals(assessments.get(i - 1).date)) {
                System.out.println("Conflict detected between " 
                    + assessments.get(i - 1).name + " and " +
                    assessments.get(i).name);
            }
        }
    }

    public static void main(String[] args) {
        List<Assessment> assessments = new ArrayList<>();

        assessments.add(new Assessment("Math Exam", LocalDate.of(2025, 2, 23)));
        assessments.add(new Assessment("Science Quiz", LocalDate.of(2025, 2, 24)));
        assessments.add(new Assessment("History Test", LocalDate.of(2025, 2, 25)));

        checkForClashes(assessments);
    }
}

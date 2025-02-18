import { Text, View } from "react-native";
import { styles } from "./style";

const sampleReportData = [
    { date: "2024-02-18", present: 25, absent: 3, late: 2, total: 30 },
    { date: "2024-02-17", present: 27, absent: 2, late: 1, total: 30 },
    { date: "2024-02-16", present: 24, absent: 4, late: 2, total: 30 },
  ];

const AttendanceReport: React.FC = () => (
  <View style={styles.reportContainer}>
    <Text style={styles.reportTitle}>Recent Attendance Report</Text>
    {sampleReportData.map((day, index) => (
      <View key={index} style={styles.reportRow}>
        <Text style={styles.reportDate}>{day.date}</Text>
        <View style={styles.reportStats}>
          <Text style={[styles.reportStat, styles.presentStat]}>
            Present: {((day.present / day.total) * 100).toFixed(1)}%
          </Text>
          <Text style={[styles.reportStat, styles.lateStat]}>
            Late: {((day.late / day.total) * 100).toFixed(1)}%
          </Text>
          <Text style={[styles.reportStat, styles.absentStat]}>
            Absent: {((day.absent / day.total) * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    ))}
  </View>
);

export default AttendanceReport;
import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/shared/theme";

const rooms = [
  { title: "Late Night Talks", meta: "1.8K listening", icon: "🎙", tone: "#2A1739" },
  { title: "Game Arena", meta: "932 playing", icon: "🎮", tone: "#14243C" },
];

export function WelcomeRoomPreview() {
  return (
    <View style={styles.wrap}>
      <View style={styles.sectionHead}>
        <View>
          <Text style={styles.eyebrow}>HAPPENING NOW</Text>
          <Text style={styles.title}>Step into the vibe</Text>
        </View>
        <View style={styles.liveChip}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>18K ONLINE</Text>
        </View>
      </View>

      <View style={styles.rooms}>
        {rooms.map((room, index) => (
          <View key={room.title} style={[styles.room, { backgroundColor: room.tone }]}>
            <View style={styles.roomTop}>
              <View style={styles.roomIcon}>
                <Text style={styles.roomIconText}>{room.icon}</Text>
              </View>
              <View style={styles.roomCopy}>
                <Text style={styles.roomTitle}>{room.title}</Text>
                <Text style={styles.roomMeta}>{room.meta}</Text>
              </View>
              <Text style={styles.wave}>{index === 0 ? "▂▅▇▃▆" : "● ● ●"}</Text>
            </View>

            <View style={styles.roomBottom}>
              <View style={styles.avatars}>
                <View style={[styles.avatar, styles.a1]}><Text style={styles.avatarText}>M</Text></View>
                <View style={[styles.avatar, styles.a2]}><Text style={styles.avatarText}>A</Text></View>
                <View style={[styles.avatar, styles.a3]}><Text style={styles.avatarText}>S</Text></View>
              </View>
              <View style={styles.joinPill}><Text style={styles.joinText}>LIVE</Text></View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  eyebrow: {
    color: "#777D93",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 3,
  },
  liveChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.045)",
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  liveText: {
    color: "#C4C7D4",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  rooms: {
    flexDirection: "row",
    gap: 9,
  },
  room: {
    flex: 1,
    minHeight: 112,
    borderRadius: radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.075)",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  roomTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  roomIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  roomIconText: { fontSize: 16 },
  roomCopy: { flex: 1 },
  roomTitle: {
    color: colors.text,
    fontSize: 9,
    fontWeight: "900",
  },
  roomMeta: {
    color: "#9196A8",
    fontSize: 6.5,
    marginTop: 3,
  },
  wave: {
    color: "#D77CFF",
    fontSize: 7,
    letterSpacing: 1,
  },
  roomBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatars: { flexDirection: "row" },
  avatar: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#17121F",
    alignItems: "center",
    justifyContent: "center",
  },
  a1: { backgroundColor: "#7B42D5" },
  a2: { backgroundColor: "#D94488", marginLeft: -6 },
  a3: { backgroundColor: "#2D8EB6", marginLeft: -6 },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 6,
    fontWeight: "900",
  },
  joinPill: {
    borderRadius: radius.pill,
    backgroundColor: "rgba(232,60,185,0.14)",
    borderWidth: 1,
    borderColor: "rgba(232,60,185,0.35)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  joinText: {
    color: "#FF88D7",
    fontSize: 6,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
});

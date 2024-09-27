export interface Bet {
  id: string
  title: string
  reason: string
  result: "progress" | "green" | "red"
  gameId: string
  createdAt: string
}
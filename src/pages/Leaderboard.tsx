import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, Award, Medal, Users } from "lucide-react";

const leaderboardData = [
  {
    id: 1,
    name: "Alice Johnson",
    points: 5280,
    streak: 15,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob Williams",
    points: 4950,
    streak: 12,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Charlie Brown",
    points: 4720,
    streak: 10,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Diana Miller",
    points: 4590,
    streak: 8,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Ethan Davis",
    points: 4360,
    streak: 7,
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Finn Taylor",
    points: 4130,
    streak: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Grace Moore",
    points: 3900,
    streak: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Henry Wilson",
    points: 3670,
    streak: 3,
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Ivy Garcia",
    points: 3440,
    streak: 2,
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Jack Rodriguez",
    points: 3210,
    streak: 1,
    avatarUrl: "https://i.pravatar.cc/150?img=10",
  },
];

const LeaderboardPage = () => {
  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Leaderboard & Achievements</h1>

      <Tabs defaultValue="global" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
          <TabsTrigger value="friends">Friends Leaderboard</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="global">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>See who's leading the pack in EduVerse!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {topThree.map((user, index) => (
                  <Card key={user.id} className="text-center">
                    <CardHeader>
                      <CardTitle>
                        <div className="relative">
                          <Avatar src={user.avatarUrl} alt={user.name} className="mx-auto h-16 w-16" />
                          {index === 0 && (
                            <Award className="absolute top-0 right-0 h-6 w-6 text-amber-500" />
                          )}
                          {index === 1 && (
                            <Trophy className="absolute top-0 right-0 h-6 w-6 text-gray-500" />
                          )}
                          {index === 2 && (
                            <Medal className="absolute top-0 right-0 h-6 w-6 text-orange-400" />
                          )}
                        </div>
                        <div className="mt-2">{user.name}</div>
                      </CardTitle>
                      <CardDescription>
                        Points: {user.points} | Streak: {user.streak}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Streak
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {restOfLeaderboard.map((user, index) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{index + 4}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar src={user.avatarUrl} alt={user.name} className="h-8 w-8 mr-2" />
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{user.points}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">{user.streak}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle>Friends Leaderboard</CardTitle>
              <CardDescription>Compete with your friends and see who's on top!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="mx-auto h-10 w-10 mb-4 text-gray-400" />
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Invite friends to start competing!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Track your progress and celebrate your milestones.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Award className="mx-auto h-10 w-10 mb-4 text-gray-400" />
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  No achievements yet. Keep learning to unlock new achievements!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Global Ranking</CardTitle>
            <CardDescription>See where you stand among all learners in EduVerse.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar src="https://i.pravatar.cc/150?img=11" alt="Your Avatar" className="h-12 w-12" />
              <div>
                <h3 className="text-lg font-semibold">Your Name</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Points: 3500 | Rank: 45
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Badges</CardTitle>
            <CardDescription>Earn badges for participating in community activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Active Learner</Badge>
              <Badge>Quiz Master</Badge>
              <Badge>Top Contributor</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Learning Streak</CardTitle>
          <CardDescription>Keep your daily learning streak going to earn extra points!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
              <Flame className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">10 Days</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;

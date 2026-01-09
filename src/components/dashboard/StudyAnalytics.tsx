import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StudyAnalyticsProps {
    className?: string;
}

export const StudyAnalytics = ({ className }: StudyAnalyticsProps) => {
    // Mock data - in real app, this would come from localStorage
    const weeklyStudyData = [
        { day: 'Mon', hours: 3.5 },
        { day: 'Tue', hours: 4.2 },
        { day: 'Wed', hours: 2.8 },
        { day: 'Thu', hours: 5.1 },
        { day: 'Fri', hours: 3.9 },
        { day: 'Sat', hours: 6.5 },
        { day: 'Sun', hours: 4.8 },
    ];

    const subjectDistribution = [
        { name: 'Quants', value: 35, color: '#00E8FF' },
        { name: 'Verbal', value: 30, color: '#8B5CF6' },
        { name: 'LRDI', value: 25, color: '#FFB800' },
        { name: 'Revision', value: 10, color: '#A3FF12' },
    ];

    const progressOverTime = [
        { month: 'Sep', completion: 15 },
        { month: 'Oct', completion: 28 },
        { month: 'Nov', completion: 45 },
        { month: 'Dec', completion: 62 },
        { month: 'Jan', completion: 75 },
    ];

    return (
        <div className={className}>
            <div className="grid gap-6 md:grid-cols-2">
                {/* Weekly Study Hours */}
                <Card className="shadow-brutal-md border-3 border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase">Weekly Study Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={weeklyStudyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="day" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '2px solid #00E8FF',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Bar dataKey="hours" fill="#00E8FF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Subject Distribution */}
                <Card className="shadow-brutal-md border-3 border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase">Subject Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={subjectDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {subjectDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '2px solid #00E8FF',
                                        borderRadius: '4px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Progress Over Time */}
                <Card className="shadow-brutal-md border-3 border-border bg-card md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase">Progress Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={progressOverTime}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="month" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '2px solid #8B5CF6',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="completion"
                                    stroke="#8B5CF6"
                                    strokeWidth={3}
                                    dot={{ fill: '#8B5CF6', r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

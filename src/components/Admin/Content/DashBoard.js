import './DashBroad.scss';
import {
    BarChart,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    ResponsiveContainer
} from 'recharts';

const Dashbroad = ({ isAnimationActive = true }) => {
    const data = [
        { name: 'Page A', uv: 400, pv: 2400 },
        { name: 'Page B', uv: 300, pv: 4567 },
        { name: 'Page C', uv: 320, pv: 1398 },
        { name: 'Page D', uv: 200, pv: 9800 },
        { name: 'Page E', uv: 278, pv: 3908 },
        { name: 'Page F', uv: 189, pv: 4800 },
    ];

    return (
        <div className="dashbroad-container">
            <div className="title">Analytics Dashboard</div>

            <div className="content">
                <div className="c-left">
                    <div className="child">Total Users</div>
                    <div className="child">Total Quiz</div>
                    <div className="child">Total Question</div>
                    <div className="child">Total Answer</div>
                </div>

                <div className="c-right" style={{ width: '50%', height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="pv"
                                fill="#8884d8"
                                isAnimationActive={isAnimationActive}
                            />
                            <Bar
                                dataKey="uv"
                                fill="#82ca9d"
                                isAnimationActive={isAnimationActive}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashbroad;

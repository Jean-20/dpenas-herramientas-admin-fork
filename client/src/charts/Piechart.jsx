import * as React from 'react';
import { PieChart as MuiPieChart } from '@mui/x-charts';

export default function PieChart({
    data = [
        { id: 0, value: 10, label: 'Serie A', color: '#3B82F6' }, // Azul Tailwind (blue-500)
        { id: 1, value: 15, label: 'Serie B', color: '#06B6D4' }, // Celeste (cyan-500)
        { id: 2, value: 20, label: 'Serie C', color: '#8B5CF6' }, // Morado (violet-500)
    ],
    width = 320,
    height = 320,
    className = '',
}) {
    return (
        <div className={className}>
            <MuiPieChart
                series={[
                    {
                        data,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 6,
                    },
                ]}
                width={width}
                height={height}
                sx={{
                    backgroundColor: 'transparent',
                    '.MuiChartsLegend-root': {
                        color: 'black',
                    },
                    '.MuiChartsArc-label': {
                        fill: '#fff',
                        fontSize: 14,
                    },
                }}
            />
        </div>
    );
}

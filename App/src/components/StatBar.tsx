import { View, Text, ColorValue, DimensionValue } from 'react-native';
import StatBarStyle from '../styles/StatBarStyle';
import { LinearGradient } from 'expo-linear-gradient';

type StatBarProps = {
	title: string;
	val?: number;
	minVal?: number;
	maxVal: number;
	unit?: string;
	height?: number;
	width?: DimensionValue;
	colors?: string[];
};

export default function StatBar({
	title,
	val = 0,
	minVal = 0,
	maxVal,
	unit = '',
	height = 20,
	width = 300,
	colors = ['#E06C75', '#E5C07B', '#98C379'],
}: StatBarProps) {
	let progress = (val / (maxVal - minVal)) * 100;

	return (
		<View style={[{ width: width }]}>
			<Text style={StatBarStyle.title}>{title}</Text>
			<View>
				<Text
					className='font-semibold'
					style={[
						StatBarStyle.text,
						{
							lineHeight: height,
							fontSize: height > 40 ? height * 0.4 : 14,
						},
					]}
				>
					{val} / {maxVal} {unit}
				</Text>
				<LinearGradient
					colors={colors}
					style={[
						StatBarStyle.bar,
						{ height: height, borderRadius: height / 2 },
					]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
				></LinearGradient>
				<View
					style={[
						StatBarStyle.barCover,
						{
							height: height,
							width: `${100 - progress}%`,
							borderTopRightRadius: height / 2,
							borderBottomRightRadius: height / 2,
						},
					]}
				/>
				<View
					style={{
						backgroundColor: '#f2f2f2',
						height: height,
						width: height / 2,
						position: 'absolute',
						zIndex: 1,
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						opacity: val > 0 ? 0 : 1,
					}}
				>
					<View
						style={{
							backgroundColor: '#999999',
							height: height,
							width: height / 2,
							borderTopLeftRadius: height / 2,
							borderBottomLeftRadius: height / 2,
							zIndex: -1,
						}}
					/>
				</View>
			</View>
		</View>
	);
}

import * as React from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';
import {useContext} from 'react';
import AppContext from '../../AppContext.tsx';
import {format} from 'date-fns';
import StarRating from 'react-native-star-rating-widget';

export default function ReviewCard(props: any) {
  const review = props.review;
  const context = useContext(AppContext);
  console.log(review);

  return (
    <View
      style={{
        width: '100%',
        height: 94,
        flexDirection: 'row',
        padding: 13,
        marginTop: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
      }}>
      <View
        style={{
          height: '100%',
          width: 48,
          justifyContent: 'center',
          marginRight: 17,
        }}>
        <Image
          source={require('../../public/icons/reviewProfile.png')}
          style={{
            height: 48,
            width: 48,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          height: '100%',
          flex: 1,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <StarRating
            rating={review.score}
            onChange={value => console.log(value)}
            starSize={15}
            starStyle={{
              marginHorizontal: 0,
            }}
            style={{
              marginRight: 10,
            }}
          />
          <Text>{'( ' + review.score.toString() + ' / 5.0 )'}</Text>
        </View>

        <Text>{review.text}</Text>
        <Text>{format(new Date(review.registerDate), 'yy.MM.dd hh:mm')}</Text>
      </View>
    </View>
  );
}

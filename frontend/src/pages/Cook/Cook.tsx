import { withStyles } from "@material-ui/core/styles";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Layout from "components/Layout";
import Loading from "components/Loading";
import ProfileImage from "components/ProfileImage";
import get from 'lodash.get';
import React from "react";
import Slider from 'react-animated-slider';
// @ts-ignore
import horizontalCss from 'react-animated-slider/build/horizontal.css';

const getCook = `query GetCook($cook_id: ID!) {
  getCook(cook_id: $cook_id) {
    cook {
      gourmet {
        identity_id
        first_name
        last_name
        image {
          key
        }
      }
      is_pro
      confirmed
      business_name
      siren
      pro_email
      pro_phone_number
      legal_first_name
      legal_last_name
      legal_birthdate
    },
    message,
    errors {
      message
    }
  }
}`;

const styles = () => ({});

interface ICookProps {
  classes?: any;
  match: any;
}

export class Cook extends React.Component<ICookProps, {}> {
  public render() {
    const content = [
      { title: 'title 1', description: 'description 1', image: 'https://images.pexels.com/photos/358482/pexels-photo-358482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
      { title: 'title 2', description: 'description 2', image: 'https://images.pexels.com/photos/355423/pexels-photo-355423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    ];

    const { id: cookId } = this.props.match.params;

    return (
      <Layout>
        <Connect query={graphqlOperation(getCook, { cook_id: cookId })}>
          {({ data }) => {
            if (!data.getCook) {
              return <Loading />;
            }

            const cook = data.getCook.cook;

            return (
              <Slider classNames={horizontalCss}>
                {content.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                  >
                    <div>
                      <ProfileImage
                        imageKey={get(cook, 'gourmet.image.key')}
                        identityId={cook.gourmet.identity_id}
                      />
                      <h1>{cook.gourmet.first_name} {cook.gourmet.last_name}</h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            );
          }}
        </Connect>
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Cook as any) as any;

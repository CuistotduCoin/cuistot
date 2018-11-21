import { withStyles } from "@material-ui/core/styles";
import cx from 'classnames';
import dynamic from 'next/dynamic'
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

// tslint:disable-next-line:variable-name
const SearchForm = dynamic(() => import('../../components/SearchForm'), {
  ssr: false
})

const styles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  content: {
    flex: 1
  }
});

interface ILayoutProps {
  classes: any;
  valueProposition?: string;
  description?: string;
  children: any;
  className?: string;
  headerProps?: object;
}

export class Layout extends React.Component<ILayoutProps, {}> {
  public static defaultProps: Partial<ILayoutProps> = {
    headerProps: {},
  };

  public render() {
    const { classes, valueProposition, description, children, headerProps, className } = this.props;

    return (
      <div className={cx(classes.container, className)}>
        <div className={classes.content}>
          <Header {...headerProps} />
          {valueProposition && (
            <Hero
              imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
              videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
              valueProposition={valueProposition}
              description={description}
            />
          )}
          <SearchForm />
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles as any)(Layout) as any;

import React from "react";
import PropTypes from "prop-types";
import { Title as UITitle, Heading, Subtitle } from "@socialgouv/react-ui";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";

class Title extends React.PureComponent {
  static propTypes = {
    level: PropTypes.number,
    children: PropTypes.node,
    date: PropTypes.string,
  };
  render() {
    const { level, children, date } = this.props;
    // the whole date thing here is related to the "Avertissement" element and only it.
    const formatedDate =
      (date &&
        format(parseISO(date), "dd MMMM yyyy", {
          locale: frLocale,
        })) ||
      undefined;

    switch (level) {
      case 0:
        return <UITitle subtitle={formatedDate}>{children}</UITitle>;
      case 1:
        return (
          <Heading>
            {children}
            {formatedDate && <Subtitle>{formatedDate}</Subtitle>}
          </Heading>
        );

      case 2:
        return (
          <Heading as="h4">
            {children}
            {formatedDate && <Subtitle>{formatedDate}</Subtitle>}
          </Heading>
        );
      case 3:
        return (
          <Heading as="h5">
            {children}
            {formatedDate && <Subtitle>{formatedDate}</Subtitle>}
          </Heading>
        );
      default:
        return (
          <Heading as="h6">
            {children}
            {formatedDate && <Subtitle>{formatedDate}</Subtitle>}
          </Heading>
        );
    }
  }
}

export default Title;

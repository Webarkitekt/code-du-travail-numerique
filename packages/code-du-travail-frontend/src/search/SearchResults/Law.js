import React from "react";
import Link from "next/link";
import { getRouteBySource } from "@cdt/sources";
import {
  Container,
  LargeLink,
  List,
  ListItem,
  Section,
  Wrapper
} from "@cdt/ui-old";

import { LinkContent } from "./LinkContent";

export const Law = ({ items, query }) => (
  <Section>
    <Container narrow>
      <Wrapper variant="light">
        <h2>Que dit la loi&nbsp;?</h2>
        <List>
          {items.map(item => (
            <ListItem key={item.slug}>
              <Link
                href={{
                  pathname: `/${getRouteBySource(item.source)}/[slug]`,
                  query: {
                    ...(query && { q: query }),
                    slug: item.slug
                  }
                }}
                as={`/${getRouteBySource(item.source)}/${item.slug}${
                  query ? `?q=${query}` : ""
                }`}
                passHref
              >
                <LargeLink>
                  <LinkContent {...item} />
                </LargeLink>
              </Link>
            </ListItem>
          ))}
        </List>
      </Wrapper>
    </Container>
  </Section>
);
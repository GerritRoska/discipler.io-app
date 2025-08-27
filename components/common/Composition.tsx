import React from 'react';
import { BaseView, BaseViewProps } from './BaseView';
import { BaseText, BaseTextProps } from './BaseText';
import { BaseTouchable, BaseTouchableProps } from './BaseTouchable';

// Card composition
export interface CardProps extends BaseViewProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  pressable?: boolean;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  onPress,
  pressable = false,
  headerRight,
  footer,
  children,
  padding = 'md',
  surface = true,
  borderRadius = 'lg',
  shadow = 'md',
  ...props
}) => {
  const CardContainer = pressable ? BaseTouchable : BaseView;
  
  // Filter out props that might conflict with React Native 0.79.5 types
  const { hitSlop, ...safeProps } = props;
  
  return (
    <CardContainer
      padding={padding}
      surface={surface}
      borderRadius={borderRadius}
      shadow={shadow}
      onPress={onPress}
      {...safeProps}
    >
      {(title || subtitle || headerRight) && (
        <BaseView row center marginBottom="sm">
          <BaseView flex>
            {title && (
              <BaseText variant="subheading" marginBottom={subtitle ? 'xs' : undefined}>
                {title}
              </BaseText>
            )}
            {subtitle && (
              <BaseText variant="caption" muted>
                {subtitle}
              </BaseText>
            )}
          </BaseView>
          {headerRight && (
            <BaseView>
              {headerRight}
            </BaseView>
          )}
        </BaseView>
      )}
      
      {children}
      
      {footer && (
        <BaseView marginTop="md">
          {footer}
        </BaseView>
      )}
    </CardContainer>
  );
};

// List composition
export interface ListProps extends BaseViewProps {
  items: React.ReactNode[];
  separator?: React.ReactNode;
  emptyState?: React.ReactNode;
}

export const List: React.FC<ListProps> = ({
  items,
  separator,
  emptyState,
  children,
  ...props
}) => {
  if (items.length === 0 && emptyState) {
    return <BaseView {...props}>{emptyState}</BaseView>;
  }

  return (
    <BaseView {...props}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {separator && index < items.length - 1 && separator}
        </React.Fragment>
      ))}
      {children}
    </BaseView>
  );
};

// Section composition
export interface SectionProps extends BaseViewProps {
  title?: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  action,
  children,
  marginBottom = 'lg',
  ...props
}) => {
  return (
    <BaseView marginBottom={marginBottom} {...props}>
      {(title || subtitle || action) && (
        <BaseView row center marginBottom="md">
          <BaseView flex>
            {title && (
              <BaseText variant="subheading" marginBottom={subtitle ? 'xs' : undefined}>
                {title}
              </BaseText>
            )}
            {subtitle && (
              <BaseText variant="caption" muted>
                {subtitle}
              </BaseText>
            )}
          </BaseView>
          {action && (
            <BaseTouchable onPress={action.onPress}>
              <BaseText color="primary" weight="medium">
                {action.label}
              </BaseText>
            </BaseTouchable>
          )}
        </BaseView>
      )}
      {children}
    </BaseView>
  );
};

// Stack composition for vertical layouts
export interface StackProps extends BaseViewProps {
  spacing?: keyof typeof import('../../lib/theme').theme.spacing;
  children: React.ReactNode;
}

export const Stack: React.FC<StackProps> = ({
  spacing = 'md',
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <BaseView {...props}>
      {childrenArray.map((child, index) => (
        <BaseView key={index} marginBottom={index < childrenArray.length - 1 ? spacing : undefined}>
          {child}
        </BaseView>
      ))}
    </BaseView>
  );
};

// Row composition for horizontal layouts
export interface RowProps extends BaseViewProps {
  spacing?: keyof typeof import('../../lib/theme').theme.spacing;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  children: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({
  spacing = 'md',
  align = 'center',
  justify = 'start',
  children,
  row = true,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <BaseView 
      row={row}
      alignCenter={align === 'center'}
      justifyCenter={justify === 'center'}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <BaseView 
          key={index} 
          marginRight={index < childrenArray.length - 1 ? spacing : undefined}
        >
          {child}
        </BaseView>
      ))}
    </BaseView>
  );
};

// Loading state composition
export interface LoadingStateProps extends BaseViewProps {
  loading: boolean;
  error?: string;
  retry?: () => void;
  children: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  error,
  retry,
  children,
  center = true,
  ...props
}) => {
  if (loading) {
    return (
      <BaseView center {...props}>
        <BaseText muted>Loading...</BaseText>
      </BaseView>
    );
  }

  if (error) {
    return (
      <BaseView center {...props}>
        <BaseText color="error" center marginBottom="md">
          {error}
        </BaseText>
        {retry && (
          <BaseTouchable onPress={retry}>
            <BaseText color="primary">Retry</BaseText>
          </BaseTouchable>
        )}
      </BaseView>
    );
  }

  return <>{children}</>;
};

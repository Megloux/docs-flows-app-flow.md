Got it! Here's the updated **Accordion Component Documentation** emphasizing its use as a reusable content organizer:

---

### **Accordion Component Documentation**

#### **Component Purpose**
The `Accordion` component organizes and displays collapsible content. It can be used for various purposes, such as grouping exercises by category, FAQs, or any structured data that requires toggling between expanded and collapsed states.

---

#### **Key Props**
- **title (string)**: The content header displayed on the accordion.
- **description (string)**: Optional. A brief summary or subtitle under the title.
- **children (ReactNode)**: The expandable content rendered inside the accordion when expanded.
- **defaultExpanded (boolean)**: Determines if the accordion is expanded by default.
- **onToggle (function)**: Callback function triggered when the accordion expands or collapses.

---

#### **Component Structure**
1. **Header Section**
   - Displays the **title**, **description**, and toggle icon (`ChevronDown` / `ChevronUp`).
   - Click events on the header trigger expansion and collapse.
   - The icon changes dynamically based on the accordion's state.

2. **Content Area**
   - The **content area** renders only when the accordion is expanded.
   - In the exercise library, this area displays a grid of exercises with a view toggle.
   - This section can display custom or reusable components depending on the use case (e.g., exercises, FAQs, or nested data).

3. **View Toggle (Specific to Exercise Library)**
   - Toggles between **grid** and **list** layouts.
   - Controlled by `viewMode` state with buttons/icons (`Grid` and `List`).

4. **Custom Content Support**
   - The `Accordion` can render any content passed through the `children` prop.
   - This design allows flexibility for future use cases without modifying the core component logic.

---

#### **Component Behavior**
- The accordion can **expand** and **collapse** through user interaction.
- Maintains internal state (`expanded`) or can be controlled externally via props.
- Supports **dynamic content rendering** inside the expanded section.
- Implements efficient event handling to manage state changes and animations.

---

#### **Developer Notes**
- The component should support **controlled** and **uncontrolled** states (allowing external or internal state management).
- Content within the accordion should be fully customizable through props.
- Use CSS animations or transitions for smooth expand/collapse effects.
- Ensure proper ARIA roles (`aria-expanded`, `aria-controls`) for accessibility compliance.

---

#### **Sample Code Snippet**

```tsx
type AccordionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  children,
  defaultExpanded = false,
  onToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.(!isExpanded);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={handleToggle}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isExpanded && <div className="accordion-content">{children}</div>}
    </div>
  );
};
```

---

This setup keeps the component reusable and easily extendable across the app. Let me know if this aligns with your needs!


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

const COLORS = {
  navy: '#23374B',
  teal: '#369187',
  orange: '#EB9137',
  white: '#FFFFFF',
  background: '#F6F8F7',
  lightTeal: '#E8F3F1',
  grey: '#718096',
  border: '#E2E8F0',
};

const courses = [
  {
    id: '1',
    name: 'Professional Pet Care',
    category: 'Six-Month Courses',
    duration: '6 Months',
    description:
      'Develop professional knowledge and practical skills in caring for animals.',
  },
  {
    id: '2',
    name: 'Dog Training Programme',
    category: 'Six-Month Courses',
    duration: '6 Months',
    description:
      'Learn practical dog training techniques and responsible animal handling.',
  },
  {
    id: '3',
    name: 'Pet Grooming',
    category: 'Six-Month Courses',
    duration: '6 Months',
    description:
      'Explore grooming techniques and essential pet hygiene practices.',
  },
  {
    id: '4',
    name: 'Pet First Aid',
    category: 'Six-Week Short Courses',
    duration: '6 Weeks',
    description:
      'Learn introductory first aid and basic emergency care for pets.',
  },
  {
    id: '5',
    name: 'Puppy Care',
    category: 'Six-Week Short Courses',
    duration: '6 Weeks',
    description:
      'Understand puppy development, socialisation and everyday care.',
  },
  {
    id: '6',
    name: 'Basic Dog Training',
    category: 'Six-Week Short Courses',
    duration: '6 Weeks',
    description:
      'Learn the foundations of positive dog training.',
  },
];

function AppButton({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary && styles.secondaryButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          secondary && styles.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const [screen, setScreen] = useState('Home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const discount =
    selectedCourses.length >= 4 ? 15 :
    selectedCourses.length === 3 ? 10 :
    selectedCourses.length === 2 ? 5 : 0;

  const toggleCourse = (id) => {
    setSelectedCourses((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const submitQuote = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert(
        'Missing information',
        'Please enter your name, email and phone number.'
      );
      return;
    }

    if (selectedCourses.length === 0) {
      Alert.alert(
        'Select a course',
        'Please select at least one course.'
      );
      return;
    }

    setScreen('Confirmation');
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setScreen('Home')}>
        <Image
          source={require('./assets/pawsitive_original_logo.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setScreen('Notifications')}
      >
        <Text style={styles.menuIcon}>♡</Text>
      </TouchableOpacity>
    </View>
  );

  const BottomNav = () => (
    <View style={styles.bottomNav}>
      {[
        ['Home', '⌂'],
        ['Courses', '▤'],
        ['Quote', '▣'],
        ['Contact', '✉'],
      ].map(([label, icon]) => (
        <TouchableOpacity
          key={label}
          style={styles.navItem}
          onPress={() => setScreen(label)}
        >
          <Text
            style={[
              styles.navIcon,
              screen === label && styles.activeNav,
            ]}
          >
            {icon}
          </Text>
          <Text
            style={[
              styles.navLabel,
              screen === label && styles.activeNav,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const CourseCard = ({ course }) => {
    const isSelected = selectedCourses.includes(course.id);

    return (
      <View style={styles.courseCard}>
        <View style={styles.courseTop}>
          <View style={styles.courseIcon}>
            <Text style={styles.courseIconText}>✦</Text>
          </View>
          <Text style={styles.duration}>{course.duration}</Text>
        </View>

        <Text style={styles.courseTitle}>{course.name}</Text>
        <Text style={styles.courseDescription}>
          {course.description}
        </Text>
        <Text style={styles.feeText}>
          Course fee: To be confirmed
        </Text>

        <AppButton
          title="View course details"
          secondary
          onPress={() => {
            setSelectedCourse(course);
            setScreen('Details');
          }}
        />

        <TouchableOpacity
          style={[
            styles.selectButton,
            isSelected && styles.selectedButton,
          ]}
          onPress={() => toggleCourse(course.id)}
        >
          <Text style={styles.selectButtonText}>
            {isSelected ? '✓ Selected' : '+ Select course'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HomeScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroLogoContainer}>
          <Image
            source={require('./assets/pawsitive_original_logo.png')}
            style={styles.heroLogo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.heroEyebrow}>
          CARE • TRAINING • CONFIDENCE
        </Text>

        <Text style={styles.heroTitle}>
          Welcome to Pawsitive Pet Academy
        </Text>

        <Text style={styles.heroDescription}>
          Learn, grow and develop the skills to give animals
          the care and attention they deserve.
        </Text>

        <AppButton
          title="Explore Our Courses"
          onPress={() => setScreen('Courses')}
        />

        <TouchableOpacity
          onPress={() => setScreen('About')}
        >
          <Text style={styles.learnMore}>
            Discover our academy →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionEyebrow}>WHAT WE OFFER</Text>
        <Text style={styles.sectionTitle}>
          Explore Our Academy
        </Text>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setScreen('Courses')}
        >
          <Text style={styles.featureIcon}>01</Text>
          <Text style={styles.featureTitle}>
            Professional Programmes
          </Text>
          <Text style={styles.featureDescription}>
            Explore our six-month learning programmes.
          </Text>
          <Text style={styles.cardLink}>Explore programmes →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setScreen('Courses')}
        >
          <Text style={styles.featureIcon}>02</Text>
          <Text style={styles.featureTitle}>
            Short Courses
          </Text>
          <Text style={styles.featureDescription}>
            Develop practical skills through six-week courses.
          </Text>
          <Text style={styles.cardLink}>Explore short courses →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setScreen('Quote')}
        >
          <Text style={styles.featureIcon}>03</Text>
          <Text style={styles.featureTitle}>
            Request a Quote
          </Text>
          <Text style={styles.featureDescription}>
            Choose your courses and discover available discounts.
          </Text>
          <Text style={styles.cardLink}>Get started →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>
          Ready to start learning?
        </Text>
        <Text style={styles.ctaDescription}>
          Take the next step towards your pet-care journey.
        </Text>
        <AppButton
          title="Get a Quote"
          onPress={() => setScreen('Quote')}
        />
      </View>
    </ScrollView>
  );

  const CoursesScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.pageHeading}>
        <Text style={styles.sectionEyebrow}>LEARN WITH US</Text>
        <Text style={styles.pageTitle}>Our Courses</Text>
        <Text style={styles.pageDescription}>
          Discover programmes designed to develop your
          animal-care knowledge and practical skills.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Six-Month Courses
        </Text>
        {courses
          .filter((course) => course.category === 'Six-Month Courses')
          .map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Six-Week Short Courses
        </Text>
        {courses
          .filter((course) =>
            course.category === 'Six-Week Short Courses'
          )
          .map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </View>
    </ScrollView>
  );

  const DetailsScreen = () => (
    <ScrollView>
      <View style={styles.pageHeading}>
        <Text style={styles.sectionEyebrow}>COURSE INFORMATION</Text>
        <Text style={styles.pageTitle}>
          {selectedCourse?.name}
        </Text>
        <Text style={styles.duration}>
          {selectedCourse?.duration}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this course</Text>
        <Text style={styles.bodyText}>
          {selectedCourse?.description}
        </Text>

        <Text style={styles.sectionTitle}>Course information</Text>
        <Text style={styles.bodyText}>
          Duration: {selectedCourse?.duration}
        </Text>
        <Text style={styles.bodyText}>
          Fees: Available on request
        </Text>

        <AppButton
          title="Select this course"
          onPress={() => {
            if (
              selectedCourse &&
              !selectedCourses.includes(selectedCourse.id)
            ) {
              toggleCourse(selectedCourse.id);
            }
            setScreen('Quote');
          }}
        />

        <AppButton
          title="Back to courses"
          secondary
          onPress={() => setScreen('Courses')}
        />
      </View>
    </ScrollView>
  );

  const QuoteScreen = () => (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.pageHeading}>
        <Text style={styles.sectionEyebrow}>LET'S GET STARTED</Text>
        <Text style={styles.pageTitle}>Request a Quote</Text>
        <Text style={styles.pageDescription}>
          Select your courses and submit your details
          to request a quotation.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Your selected courses
        </Text>

        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.selectionCard,
              selectedCourses.includes(course.id) &&
                styles.selectionActive,
            ]}
            onPress={() => toggleCourse(course.id)}
          >
            <View style={styles.checkbox}>
              <Text style={styles.checkboxText}>
                {selectedCourses.includes(course.id) ? '✓' : ''}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.selectionTitle}>
                {course.name}
              </Text>
              <Text style={styles.smallText}>
                {course.duration}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.discountCard}>
          <Text style={styles.sectionTitle}>
            Your discount
          </Text>
          <Text style={styles.discountNumber}>
            {discount}%
          </Text>
          <Text style={styles.bodyText}>
            {selectedCourses.length === 0
              ? 'Select courses to see your discount.'
              : selectedCourses.length === 1
              ? 'One course: no discount.'
              : `${selectedCourses.length} courses selected. You qualify for a ${discount}% discount.`}
          </Text>

          <Text style={styles.smallText}>
            2 courses: 5%  •  3 courses: 10%  •  4+ courses: 15%
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Your contact details
        </Text>

        <Text style={styles.inputLabel}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.inputLabel}>Additional message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Tell us anything else we should know"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <AppButton
          title="Submit Quote Request"
          onPress={submitQuote}
        />
      </View>
    </ScrollView>
  );

  const ConfirmationScreen = () => (
    <View style={styles.confirmation}>
      <Text style={styles.confirmationIcon}>✓</Text>
      <Text style={styles.pageTitle}>Thank You!</Text>
      <Text style={styles.bodyText}>
        Your quotation request has been prepared successfully.
      </Text>
      <Text style={styles.bodyText}>
        Selected courses: {selectedCourses.length}
      </Text>
      <Text style={styles.bodyText}>
        Applicable discount: {discount}%
      </Text>
      <Text style={styles.smallText}>
        This demonstration does not send information to a server.
      </Text>
      <AppButton
        title="Return Home"
        onPress={() => setScreen('Home')}
      />
    </View>
  );

  const AboutScreen = () => (
    <ScrollView>
      <View style={styles.pageHeading}>
        <Text style={styles.sectionEyebrow}>OUR STORY</Text>
        <Text style={styles.pageTitle}>About Us</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Pawsitive Pet Academy
        </Text>
        <Text style={styles.bodyText}>
          Pawsitive Pet Academy is a pet-care and training
          academy based in Durban, founded by Sarah Smith in 2023.
        </Text>
        <Text style={styles.bodyText}>
          Our aim is to provide accessible pet-care education
          and practical animal-training skills.
        </Text>
        <Text style={styles.sectionTitle}>Our values</Text>
        {['Care', 'Training', 'Confidence'].map((item) => (
          <View style={styles.valueCard} key={item}>
            <Text style={styles.valueTitle}>{item}</Text>
          </View>
        ))}
        <AppButton
          title="Explore Our Courses"
          onPress={() => setScreen('Courses')}
        />
      </View>
    </ScrollView>
  );

  const ContactScreen = () => (
    <ScrollView>
      <View style={styles.pageHeading}>
        <Text style={styles.sectionEyebrow}>GET IN TOUCH</Text>
        <Text style={styles.pageTitle}>Contact Us</Text>
        <Text style={styles.pageDescription}>
          Have questions about our courses? We'd love to hear
          from you.
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Our location</Text>
          <Text style={styles.bodyText}>Durban, South Africa</Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Our academy</Text>
          <Text style={styles.bodyText}>
            Pawsitive Pet Academy
          </Text>
          <Text style={styles.bodyText}>
            Care • Training • Confidence
          </Text>
        </View>
        <Text style={styles.bodyText}>
          Use the quotation form to tell us which courses
          you are interested in.
        </Text>
        <AppButton
          title="Request a Quote"
          onPress={() => setScreen('Quote')}
        />
      </View>
    </ScrollView>
  );

  const FAQScreen = () => {
    const questions = [
      ['What courses are available?', 'We offer six-month programmes and six-week short courses.'],
      ['Can I select multiple courses?', 'Yes. You can select multiple courses when requesting a quotation.'],
      ['Are discounts available?', 'Yes. Discounts depend on the number of courses selected.'],
      ['How do I request a quote?', 'Select your courses, enter your details and submit the quote request form.'],
    ];

    return (
      <ScrollView>
        <View style={styles.pageHeading}>
          <Text style={styles.sectionEyebrow}>NEED HELP?</Text>
          <Text style={styles.pageTitle}>Frequently Asked Questions</Text>
        </View>
        <View style={styles.section}>
          {questions.map(([question, answer]) => (
            <View style={styles.featureCard} key={question}>
              <Text style={styles.featureTitle}>{question}</Text>
              <Text style={styles.bodyText}>{answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const ProfileScreen = () => (
    <View style={styles.section}>
      <Text style={styles.pageTitle}>My Profile</Text>
      <Text style={styles.bodyText}>
        Your personal information and course selections.
      </Text>
      <Text style={styles.bodyText}>
        Name: {name || 'Not provided'}
      </Text>
      <Text style={styles.bodyText}>
        Email: {email || 'Not provided'}
      </Text>
      <Text style={styles.bodyText}>
        Selected courses: {selectedCourses.length}
      </Text>
      <AppButton
        title="Request a Quote"
        onPress={() => setScreen('Quote')}
      />
    </View>
  );

  const NotificationsScreen = () => (
    <View style={styles.section}>
      <Text style={styles.pageTitle}>Notifications</Text>
      <Text style={styles.bodyText}>
        You have no new notifications.
      </Text>
      <AppButton
        title="Return Home"
        onPress={() => setScreen('Home')}
      />
    </View>
  );

  const renderScreen = () => {
    switch (screen) {
      case 'Home':
        return <HomeScreen />;
      case 'Courses':
        return <CoursesScreen />;
      case 'Details':
        return <DetailsScreen />;
      case 'Quote':
        return <QuoteScreen />;
      case 'Confirmation':
        return <ConfirmationScreen />;
      case 'About':
        return <AboutScreen />;
      case 'Contact':
        return <ContactScreen />;
      case 'FAQ':
        return <FAQScreen />;
      case 'Profile':
        return <ProfileScreen />;
      case 'Notifications':
        return <NotificationsScreen />;
      default:
        return <HomeScreen />;
    }
  };
if (showSplash) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#E8F3F1',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image
        source={require('./assets/pawsitive_original_logo.png')}
        style={{ width: 260, height: 260, resizeMode: 'contain' }}
      />
      <Text style={{ color: '#23374B', fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>
        Pawsitive Pet Academy
      </Text>
      <Text style={{ color: '#369187', fontSize: 13, marginTop: 8, letterSpacing: 1 }}>
        CARE • TRAINING • CONFIDENCE
      </Text>
    </SafeAreaView>
  );
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />

      <View style={styles.content}>
        {renderScreen()}
      </View>

      {screen !== 'Confirmation' && <BottomNav />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  header: {
    height: 76,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLogo: {
    width: 155,
    height: 65,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.lightTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 26,
    color: COLORS.navy,
  },
  hero: {
    backgroundColor: COLORS.navy,
    padding: 25,
    paddingVertical: 35,
    alignItems: 'center',
  },
  heroLogoContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 12,
    marginBottom: 22,
  },
  heroLogo: {
    width: 235,
    height: 165,
  },
  heroEyebrow: {
    color: COLORS.teal,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 15,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 37,
    marginBottom: 15,
  },
  heroDescription: {
    color: '#E4EBF0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  button: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.teal,
  },
  secondaryButtonText: {
    color: COLORS.teal,
  },
  learnMore: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 20,
  },
  section: {
    padding: 20,
  },
  sectionEyebrow: {
    color: COLORS.teal,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 9,
  },
  sectionTitle: {
    color: COLORS.navy,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureIcon: {
    color: COLORS.orange,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  featureTitle: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  featureDescription: {
    color: COLORS.grey,
    fontSize: 14,
    lineHeight: 22,
  },
  cardLink: {
    color: COLORS.teal,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 14,
  },
  cta: {
    backgroundColor: COLORS.lightTeal,
    margin: 20,
    padding: 22,
    borderRadius: 16,
  },
  ctaTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.navy,
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 22,
  },
  pageHeading: {
    padding: 22,
    backgroundColor: COLORS.lightTeal,
  },
  pageTitle: {
    color: COLORS.navy,
    fontSize: 29,
    fontWeight: '900',
    marginBottom: 12,
  },
  pageDescription: {
    color: COLORS.grey,
    fontSize: 15,
    lineHeight: 23,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    padding: 19,
    borderRadius: 16,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  courseTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseIcon: {
    backgroundColor: COLORS.lightTeal,
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseIconText: {
    color: COLORS.teal,
    fontSize: 24,
  },
  duration: {
    color: COLORS.teal,
    fontSize: 12,
    fontWeight: '800',
  },
  courseTitle: {
    color: COLORS.navy,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 9,
  },
  courseDescription: {
    color: COLORS.grey,
    fontSize: 14,
    lineHeight: 22,
  },
  feeText: {
    color: COLORS.orange,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 5,
  },
  selectButton: {
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.lightTeal,
  },
  selectedButton: {
    backgroundColor: COLORS.teal,
  },
  selectButtonText: {
    color: COLORS.navy,
    fontWeight: '800',
  },
  bodyText: {
    color: COLORS.grey,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 15,
  },
  selectionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectionActive: {
    borderColor: COLORS.teal,
    backgroundColor: COLORS.lightTeal,
  },
  checkbox: {
    height: 23,
    width: 23,
    borderWidth: 1,
    borderColor: COLORS.teal,
    borderRadius: 5,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    color: COLORS.teal,
    fontWeight: '900',
  },
  selectionTitle: {
    color: COLORS.navy,
    fontWeight: '800',
    fontSize: 14,
  },
  smallText: {
    color: COLORS.grey,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },
  discountCard: {
    backgroundColor: COLORS.navy,
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  discountNumber: {
    color: COLORS.orange,
    fontSize: 43,
    fontWeight: '900',
    marginBottom: 5,
  },
  inputLabel: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: COLORS.navy,
  },
  messageInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  confirmation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  confirmationIcon: {
    backgroundColor: COLORS.lightTeal,
    color: COLORS.teal,
    width: 75,
    height: 75,
    borderRadius: 38,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40,
    marginBottom: 25,
  },
  valueCard: {
    backgroundColor: COLORS.lightTeal,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  valueTitle: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
    paddingBottom: 14,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 23,
    color: COLORS.grey,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: COLORS.grey,
    fontWeight: '600',
  },
  activeNav: {
    color: COLORS.teal,
    fontWeight: '900',
  },
});
export default App;